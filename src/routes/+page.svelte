<script>
    import MediaQuery from "./MediaQuery.svelte";
    import axios from 'axios'
    let selected = 'Highest First'
    let stats = {total_players: 0, total_runs: 0}
    let boostData = {boosts: 0, tokens: 0}
    let apeSelect = 'ALL'
    let searchTerm = ''
    let passTerm = ''

    let filters = [
        {id: 0, text: 'Highest First'},
		{ id: 1, text: `Lowest First` },
	];
    const apeTypes = [
        {id: 0, text: 'ALL'},
		{ id: 1, text: `BAYC` },
        { id: 1, text: `MAYC` },
    ]
    const tierFilters = [
        {id: 0, text: 'ALL'},
        { id: 1, text: `1` },
        { id: 2, text: `2` },
        { id: 3, text: `3` },
        { id: 4, text: `4` },
    ]
    let currentTierFilter = 'ALL'
    let results = []
    let totals = {bayc: 0, mayc: 0}
    let tierStats = {1: 0, 2: 0, 3: 0, 4: 0}
    // Load data function
    async function load(){
        try {
        const response = await axios.get('https://api.dookeystats.com/stats')
        stats.total_players = response.data.total_players
        stats.total_runs = response.data.total_runs

        const boostRequest = await axios.get('https://api.dookeystats.com/boosts')
        boostData = boostRequest.data
    }
        catch (error) {
            console.log(error)
        }
    }
    async function linkClick(){
        const response = await axios.get('https://api.dookeystats.com/link/click');
        window.open('https://twitter.com/dookey_boost', '_blank');
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
    async function search(){
        const response = await axios.get(`https://api.dookeystats.com/wallet/${searchTerm}`)
        results = response.data
    }
    async function searchPass(){
        const response = await axios.get(`https://api.dookeystats.com/pass/${passTerm}`)
        if(response.data.rank){
            results = []
            results.push(response.data)
        } else {
            results = []
        }
    }
    function resetSearch(){
        searchTerm = ''
        passTerm = ''
        loadResults()
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
    async function apeFilter(){
        console.log(apeSelect)
        if (apeSelect.text == 'ALL'){
            const response = await axios.get('https://api.dookeystats.com/top500')
            results = response.data
        }
        if (apeSelect.text == 'MAYC'){
            const response = await axios.get('https://api.dookeystats.com/mayc')
            results = response.data
        }
        if (apeSelect.text == 'BAYC'){
            const response = await axios.get('https://api.dookeystats.com/bayc')
            results = response.data
        }
    }
    async function filterTier(){
        if (currentTierFilter.text == 'ALL'){
            const response = await axios.get('https://api.dookeystats.com/top500')
            results = response.data
            return
        }
        const response = await axios.get(`https://api.dookeystats.com/tier/${currentTierFilter.text}`)
        results = response.data
    }
    // Interval to load data
    load()
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
    .resultItem:hover {
        -webkit-box-shadow:0 0 15px white; 
        -moz-box-shadow: 0 0 15px white; 
        box-shadow:0 0 15px white;
        border-radius: 30px;
        -webkit-transition: background 0.3s, box-shadow 0.3s;
        transition: background 0.3s, box-shadow 0.3s;
        cursor: pointer;
    }
    .linkButton{
        cursor: pointer;
    }
    .link {
  color: hotpink;
  text-decoration: none;
}
a {
    color: unset;
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
    <!-- <h3 style="background: rgba(255,255,255,0.3);">REMINDER: Yuga is currently reviewing scores and they will be finalized on the 10th.<br> 
        If you purchase a sewer pass between now and then, there's a risk the score may be invalidated.</h3> -->
<h1 style="margin: 0px;">Realtime Dookey Stats</h1><br>
Created by: <a class="link" href="https://twitter.com/geeken" target="_blank">@Geeken</a><br>Enjoying this site? Please support: <span style="color: white;">geeken.eth</span><br>
Looking for the raw data? <a class="link" href="https://docs.google.com/spreadsheets/d/1_vNXMMj1GM5gGSYf8yqa9_vCYXepL4Mjqxmq0D6cvzM/edit?usp=sharing" target="_blank">Click Here</a>
</center>
<br>
<center>
<span style="color: white;">Total Players: </span><span style="font-size: 25px"> {stats.total_players.toLocaleString("en-US")}</span>
<span style="color: white;">Total Runs: </span><span style="font-size: 25px"> {stats.total_runs.toLocaleString("en-US")}</span>
</center><br>

<center>
    <span style="color: white;">Boosts Purchased: </span><br>
    <span style="font-size: 25px"> {boostData.boosts.toLocaleString("en-US")}</span><br><br>
    <span style="color: white;">$APE Spent: </span><br>
    <span style="font-size: 25px; vertical-align: middle;"> {boostData.tokens.toLocaleString("en-US")} <span style="font-size: 17px; vertical-align: middle;">(${Math.round((boostData.tokens * 6.20)).toLocaleString("en-US")})</span></span> 
</center>


<center><h3>TOP 500 Breakdown:</h3> <span style="color: hotpink">BAYC:</span> {totals.bayc} | <span style="color: hotpink">MAYC:</span> {totals.mayc}<br><br></center>
<center>
   <span class="pink"> TIER 1:</span> {tierStats[1]}<br>
   <span class="pink">TIER 2:</span> {tierStats[2]} <br>
    <span class="pink">TIER 3:</span> {tierStats[3]}<br>
    <span class="pink">&nbsp; TIER 4:</span> {tierStats[4]}
    <br><br>
    Score: <select on:change="{toggle}">
		{#each filters as filter}
			<option value={filter}>
				{filter.text}
			</option>
		{/each}
	</select>
    Ape Type: <select bind:value={apeSelect} on:change="{apeFilter}">
		{#each apeTypes as filter}
			<option value={filter}>
				{filter.text}
			</option>
		{/each}
	</select>
    Tier: <select bind:value={currentTierFilter} on:change="{filterTier}">
		{#each tierFilters as filter}
			<option value={filter}>
				{filter.text}
			</option>
		{/each}
	</select>
    <br><br>
    Wallet: <input width="50%" type="text" bind:value={searchTerm} placeholder="Search by wallet"/><button on:click={search}>Search</button><button on:click={resetSearch}>Reset</button>
    <br><br>
    PassID: <input width="20%" type="text" on:keyup={e=>e.key==='Enter' && searchPass()} bind:value={passTerm} placeholder="Search by pass"/><button on:click={searchPass}>Search</button><button on:click={resetSearch}>Reset</button>
    <br><br>
</center>

{#if results.length < 1 }
<center><h1>NO MATCH FOUND</h1></center>
{/if}

{#each results as { address, tier, rank, score, ape_type, ape_img, ape_id, boost_count, username, pass_id, meta}, i}
<div class="center resultItem">
<a href={`/player/${address}`} title="View Player Data">
<li style="list-style: none; background: rgba(103, 58, 183, 0.8); margin-bottom: 5px; border-radius: 30px;">
    <div style="display:table;">
        <span style="font-size: 50px; display:table-cell; vertical-align:middle;">
            {#if rank < 10}<span class="rank" style="padding-left: 25px; padding-right: 25px; font-size: 35px;">{rank.toLocaleString("en-US")}</span> {/if}
            {#if rank >= 10}<span class="rank" style="padding-left: 10px; padding-right: 10px; font-size: 35px;">{rank.toLocaleString("en-US")}</span>{/if}
        </span> 
    
    <MediaQuery query="(max-width: 480px)" let:matches>
        {#if !matches}
    <img style="border-radius: 5px;" height="130px" src={tiers[tier]}>
    {/if}
</MediaQuery>
    <span class="data" style="display:table-cell; vertical-align:middle; font-size: 15px; padding-left: 25px;">
        {#if meta && meta.attributes[2].value !=="N/A"}<span class="rank" style="color: #08e808; font-size: 15px;">{meta.attributes[2].value.toLocaleString("en-US")} - Validated Rank</span><br>{/if}
        {#if meta && meta.attributes[2].value =="N/A"}<span class="rank" style="font-size: 15px;color: #ff0101">RANK WIPED</span><br>{/if}
        {score.toLocaleString("en-US")} - Score<br>
        {#if meta && meta.attributes[1].value !== "N/A"}<span style="color: #08e808">{meta.attributes[1].value.toLocaleString("en-US")} - Validated Score</span><br>{/if}
        {#if meta && meta.attributes[1].value == "N/A"}<span style="color: #ff0101">SCORE WIPED</span><br>{/if}
    {#if username }<span style="font-size: 15px; text-decoration: bold">
        <p id="username">{username}</p>
    </span><br>{/if}
    {#if !username }<span style="font-size: 15px; text-decoration: bold">
        <p id="username">NO_USERNAME</p>
    </span><br>{/if}
    <!-- (${ ((boost_count * 2)*5.80).toFixed()}) -->
    <span style="font-size: 15px;">Boosted: {boost_count ? boost_count : 0} times </span><br>
    <span style="font-size: 15px;">Pass ID: {pass_id}</span>


    <MediaQuery query="(max-width: 480px)" let:matches>
        {#if matches}
        <span style="margin-left: 0px; font-size: 15px;">(TIER {tier})</span>
        {/if}
</MediaQuery>
</span>


</div>
</li>
</a>
</div>
{/each}
<br><br><br><br><br><br><br><br>
