<script lang="ts">
    import axios from 'axios';
    import MediaQuery from "../../MediaQuery.svelte";
    import type { PageData } from './$types';
    export let data: PageData;
    let results = []
    async function load(){
        const response = await axios.get('https://api.dookeystats.com/wallet/' + data.address);
        const json = await response.data;
        results = json
    }
    load()
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

    a.button {
  display: block;
  max-width: 190px;
  text-decoration: none;
  border-radius: 4px;
  padding: 10px 10px;
  transition: 1s cubic-bezier(0.39, 0.5, 0.15, 1.36);
}

a.button {
  color: white;
  box-shadow: #673ab7cc 0 0 0 4px inset;
}

a.button:hover {
  color: #fff;
  box-shadow: #673ab7cc 0 0 0 40px inset;
}

</style>

<center style="padding-bottom: 30px;">
    Player accounts for wallet<br>
    <span style="color: white;">{data.address}</span>
</center>

<center style="padding-bottom: 30px;">
   <a href="/" class="button">Return to all results</a>
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
        <img width="100px" style="margin-right: 15px;" src={ape_img}>
    </span>
    
    <MediaQuery query="(max-width: 480px)" let:matches>
        {#if !matches}
    <img style="margin-left: -15px; border-radius: 5px;" width="100px" src={tiers[tier]}>
    {/if}
</MediaQuery>
    <span class="data" style="display:table-cell; vertical-align:middle; font-size: 20px; padding-left: 25px;">{score.toLocaleString("en-US")} Points<br>
        
    {#if username }<span style="font-size: 15px; text-decoration: bold">
        {#if username == 'BitBoyJay' }<img src="/salute.svg" width="15px" style="justify-content: center; align-items: center;">{/if}
        <a target="_blank" title="view pass holder" rel="noreferrer" href="https://opensea.io/{address}" style="text-decoration: underline; color: rgba(255, 255, 255, 0.7); font-size: 15px;"><p id="username">{username}</p></a>
    </span><br>{/if}
    {#if !username }<span style="font-size: 15px; text-decoration: bold">
        <a target="_blank" title="view pass holder" rel="noreferrer" href="https://etherscan.io/address/{address}" style="text-decoration: underline; color: rgba(255, 255, 255, 0.7); font-size: 15px;"><p id="username">View Wallet</p></a>
    </span><br>{/if}
    <!-- (${ ((boost_count * 2)*5.80).toFixed()}) -->
    <span style="font-size: 15px;">Boosted: {boost_count ? boost_count : 0} times </span><br>
    <span style="font-size: 15px;">{ape_type.toUpperCase()} #{ape_id}</span>


    <MediaQuery query="(max-width: 480px)" let:matches>
        {#if matches}
        <span style="margin-left: 0px; font-size: 15px;">(TIER {tier})</span>
        {/if}
</MediaQuery>
</span>


</div>
</li>
</div>
{/each}