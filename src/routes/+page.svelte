<script>
    import MediaQuery from "./MediaQuery.svelte";
    import axios from 'axios'
    let selected = 'Highest First'
    let stats = {total_players: 0, total_runs: 0}
    let filters = [
        {id: 0, text: 'Highest First'},
		{ id: 1, text: `Lowest First` },
	];
    let results = []
    let totals = {bayc: 0, mayc: 0}
    let tierStats = {1: 0, 2: 0, 3: 0, 4: 0}
    // Load data function
    async function load(){
        try {
        const response = await axios.get('https://api.dookeystats.com/stats')
        stats.total_players = response.data.total_players
        stats.total_runs = response.data.total_runs
    }
        catch (error) {
            console.log(error)
        }
    }
    let boosts = {}
    async function loadResults(){
        const response = await axios.get('https://api.dookeystats.com/top500')
        results = response.data

        const bayc = results.filter(result => result.ape_type == 'bayc');
        const mayc = results.filter(result => result.ape_type == 'mayc');
        totals.bayc = bayc.length
        totals.mayc = mayc.length

        const t1 = results.filter(result => result.tier == '1');
        const t2 = results.filter(result => result.tier == '2');
        const t3 = results.filter(result => result.tier == '3');
        const t4 = results.filter(result => result.tier == '4');

        tierStats[1] = t1.length
        tierStats[2] = t2.length
        tierStats[3] = t3.length
        tierStats[4] = t4.length
    }
    async function loadHigh(){
        const response = await axios.get('https://api.dookeystats.com/top500')
        results = response.data
    }
    async function loadLow(){
        const response = await axios.get('https://api.dookeystats.com/lowhigh')
        results = response.data
    }
    async function toggle(){
        console.log(selected)
        if (selected == 'Highest First'){
            selected = 'Lowest First'
            loadLow()
        }
        else {
            selected = 'Highest First'
            loadResults()
        }
    }
    // Interval to load data
    setInterval(load, 1000)
    loadResults()

 

    const colors = {
        1: '#bcef38',
        2: '#bcef38',
        3: '#bcef38',
        4: '#bcef38',
    }
    const tiers = {
        1: 'https://i.seadn.io/gcs/files/19ac0bf952e9beb67cd6a56a38b65846.jpg?auto=format&w=150',
        2: 'https://i.seadn.io/gcs/files/d61cb304e62c977e4c1dffaf8e9ebee3.jpg?auto=format&w=150',
        3: 'https://i.seadn.io/gcs/files/8c5610eeddb4f02ae570b42d8a7a2ac4.jpg?auto=format&w=150',
        4: 'https://i.seadn.io/gcs/files/67bd361f7ab978091c2e2334388b975c.jpg?auto=format&w=150',
    }

</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
   :global(body) {
		background-color: black;
        background-image: url("/dive.jpg");
        background-size: cover;
        background-attachment: fixed;
        background-repeat: no-repeat;
		color: rgba(255, 255, 255, 0.7);
		transition: background-color 0.3s;
        font-family: 'Roboto', sans-serif;
	} 
    a {
  color: hotpink;
  text-decoration: none;
}
.center {
  margin: auto;
  max-width: 540px;
}
.p {
        
        margin: 0px !important;
    }
    #username {
    display: inline-block;
    text-decoration: underline;
    margin: 0;
        overflow: hidden;
    }
@media only screen and (max-width: 600px) {
    .rank {
        vertical-align: middle;
        font-size: 18px !important;
    }
    .data{
        padding-left: 0px !important;
    }
    .p {
        margin: 0px !important;
    }
    #username {
    display: inline-block;
    margin: 0;
        overflow: hidden;
  max-width: 14ch;
  text-overflow: ellipsis;
  white-space: nowrap;
    }
}
.pink {
    color: hotpink;
}
.rank {
        vertical-align: middle;
    }
</style>
<center>
<h1 style="margin: 0px;">Realtime Dookey Stats</h1><br>
Created by: <a href="https://twitter.com/geeken" target="_blank">@Geeken</a><br>Enjoying this site? Please support: <span style="color: white;">geeken.eth</span><br>
</center>
<br><br>
<center>
<span style="color: white;">Total Players: </span><span style="font-size: 25px"> {stats.total_players.toLocaleString("en-US")}</span>
<span style="color: white;">Total Runs: </span><span style="font-size: 25px"> {stats.total_runs.toLocaleString("en-US")}</span>
</center>

<center><h3>TOP 500 Breakdown:</h3> <span style="color: hotpink">BAYC:</span> {totals.bayc} | <span style="color: hotpink">MAYC:</span> {totals.mayc}<br><br></center>
<center>
   <span class="pink"> TIER 1:</span> {tierStats[1]}<br>
   <span class="pink">TIER 2:</span> {tierStats[2]} <br>
    <span class="pink">TIER 3:</span> {tierStats[3]}<br>
    <span class="pink">&nbsp; TIER 4:</span> {tierStats[4]}
<br><br>
    Sort Results: <select on:change="{toggle}">
		{#each filters as filter}
			<option value={filter}>
				{filter.text}
			</option>
		{/each}
	</select>
    <br><br>
</center>

{#each results as { address, tier, rank, score, ape_type, ape_img, ape_id, boost_count, username}, i}
<div class="center">
<li style="list-style: none; background: rgba(103, 58, 183, 0.8); margin-bottom: 5px; border-radius: 30px;">
    <div style="display:table;">
        <span style="font-size: 50px; display:table-cell; vertical-align:middle;">
            {#if rank < 10}<span class="rank" style="padding-left: 25px; padding-right: 25px; font-size: 35px;">{rank.toLocaleString("en-US")}</span>{/if}
            {#if rank >= 10}<span class="rank" style="padding-left: 10px; padding-right: 10px; font-size: 35px;">{rank.toLocaleString("en-US")}</span>{/if}
        </span> 
    <span>
        <img width="100px" src={ape_img}>
        <MediaQuery query="(max-width: 480px)" let:matches>
            {#if matches}
            <span style="margin-left: 20%; font-size: 15px;">TIER {tier}</span>
            {/if}
            {#if !matches}
        <img style="margin-left: -5px; border-radius: 5px;" width="100px" src={tiers[tier]}>
        {/if}
    </MediaQuery>
    </span>

    <span class="data" style="display:table-cell; vertical-align:middle; font-size: 20px; padding-left: 15px;">{score.toLocaleString("en-US")} Points<br>
        
    {#if username }<span style="font-size: 15px; text-decoration: bold">
        {#if username == 'BitBoyJay' }<img src="/salute.svg" width="15px" style="justify-content: center; align-items: center;">{/if}
        <a target="_blank" title="view pass holder" rel="noreferrer" href="https://opensea.io/{address}" style="text-decoration: underline; color: rgba(255, 255, 255, 0.7); font-size: 15px;"><p id="username">{username}</p></a>
    </span><br>{/if}
    {#if !username }<span style="font-size: 15px; text-decoration: bold">
        <a target="_blank" title="view pass holder" rel="noreferrer" href="https://etherscan.io/address/{address}" style="text-decoration: underline; color: rgba(255, 255, 255, 0.7); font-size: 15px;"><p id="username">View Wallet</p></a>
    </span><br>{/if}
    <!-- (${ ((boost_count * 2)*5.80).toFixed()}) -->
    <span style="font-size: 15px;">Boosted: {boost_count ? boost_count : 0} times </span><br>
    <span style="font-size: 15px;">{ape_type.toUpperCase()} #{ape_id}</span></span>

</div>
</li>
</div>
{/each}
