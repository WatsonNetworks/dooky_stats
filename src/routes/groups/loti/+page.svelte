<script lang="ts">
    import MediaQuery from "../../MediaQuery.svelte";
    import axios from 'axios'
    export let data;

    let results = []
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

    let user = {
    "_id": "",
    "player_id": "",
    "address": "",
    "ape_id": "",
    "ape_img": "",
    "ape_type": "",
    "pass_id": 0,
    "rank": 0,
    "score": 0,
    "tier": 0,
    "username": ""
}

    async function load(){
    const userData = await axios.get(`https://api.dookeystats.com/loti`)
    results = userData.data
    }
    load()
  </script>




<center><h1>Living On The Internet <img src="/salute.svg" width="50px;"></h1></center>


{#each results as { address, tier, rank, score, ape_type, ape_img, ape_id, boost_count, username}, i}
<div class="center">
<li style="list-style: none; background: rgba(103, 58, 183, 0.8); margin-bottom: 5px; border-radius: 30px;">
    <div style="display:table;">
        <span style="font-size: 50px; display:table-cell; vertical-align:middle;">
            {#if rank < 10}<span style="padding-left: 25px; padding-right: 25px; font-size: 35px;">{rank.toLocaleString("en-US")}</span>{/if}
            {#if rank >= 10}<span style="padding-left: 10px; padding-right: 10px; font-size: 35px;">{rank.toLocaleString("en-US")}</span>{/if}
        </span> 
    <span>
        <img width="100px" src={ape_img}>
        <MediaQuery query="(max-width: 480px)" let:matches>
            {#if matches}
            <span style="margin-left: 20%">TIER {tier}</span>
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
    <span style="font-size: 15px;">Boosted: {boost_count ? boost_count : 0} times</span>
    <br>
    <span style="font-size: 15px;">{ape_type.toUpperCase()} #{ape_id}</span></span>

</div>
</li>
</div>
{/each}





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
</style>