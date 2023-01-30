<script lang="ts">
    import axios from 'axios';
    import MediaQuery from "../../MediaQuery.svelte";
    import type { PageData } from './$types';
    export let data: PageData;
    let ape_spent = 0
    let results = []
    let txs = []
    async function load(){
        const response = await axios.get('https://api.dookeystats.com/wallet/' + data.address);
        const json = await response.data;
        results = json

        ape_spent = results[0].boost_count * 2

        const requestTxs = await axios.get('https://api.dookeystats.com/txs?address=' + data.address);
        const transactions = await requestTxs.data.transactions;
        txs = transactions
    }
    load()
    const tiers = {
        1: 'https://i.seadn.io/gcs/files/19ac0bf952e9beb67cd6a56a38b65846.jpg?auto=format&w=150',
        2: 'https://i.seadn.io/gcs/files/d61cb304e62c977e4c1dffaf8e9ebee3.jpg?auto=format&w=150',
        3: 'https://i.seadn.io/gcs/files/8c5610eeddb4f02ae570b42d8a7a2ac4.jpg?auto=format&w=150',
        4: 'https://i.seadn.io/gcs/files/67bd361f7ab978091c2e2334388b975c.jpg?auto=format&w=150',
    }
    function timeSince(date) {

var seconds = Math.floor((new Date() - date) / 1000);

var interval = seconds / 31536000;

if (interval > 1) {
  return Math.floor(interval) + " years";
}
interval = seconds / 2592000;
if (interval > 1) {
  return Math.floor(interval) + " months";
}
interval = seconds / 86400;
if (interval > 1) {
  return Math.floor(interval) + (interval < 2 ? " day" : " days");
}
interval = seconds / 3600;
if (interval > 1) {
  return Math.floor(interval) + (interval < 2 ? " hour" : " hours");
}
interval = seconds / 60;
if (interval > 1) {
  return Math.floor(interval) + " minutes";
}
return Math.floor(seconds) + " seconds";
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
        -webkit-box-shadow:0 0 12px white; 
        -moz-box-shadow: 0 0 12px white; 
        box-shadow:0 0 12px white;
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
  margin-top: 20px;
  font-size: 20px;
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
   <a href="/" class="button">Return to all results</a>
</center>

<center style="padding-bottom: 30px;">
    Player accounts for wallet<br>
    <span style="color: white;">{data.address}</span>
</center>

<center style="padding-bottom: 30px;">
    Player accounts found: 
    <span style="color: white;">{results.length}</span>
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
        <p id="username">{username}</p>
    </span><br>{/if}
    {#if !username }<span style="font-size: 15px; text-decoration: bold">
        <p id="username">View Wallet</p>
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


<center style="margin-top: 40px; padding-bottom: 20px; font-size: 30px;">BOOST TRANSACTIONS</center>

<center>
   Transactions<br> 
    <span style="color: white;">{txs.length}</span>
</center>
<center style="padding-top: 5px;">
    Boosts Purchased<br> 
     <span style="color: white;">{ape_spent/2}</span>
 </center>
<center style="padding-bottom: 30px; padding-top: 5px;">
    $APE Spent<br> 
     <span style="color: white;">{ape_spent}</span>
 </center>

{#each txs as tx, i}
<div class="center resultItem">
    <center>
    <a href={`https://etherscan.io/tx/${tx.hash}`} target="_blank" title="View on Etherscan">
    <li style="list-style: none; background: rgba(103, 58, 183, 0.8); margin-bottom: 5px; border-radius: 30px;">
        <div style="display:table; padding: 10px;">
        <span style="padding-right: 10px; color: rgba(255, 255, 255, 0.7)">{timeSince(tx._timestamp)} ago</span><br><span style="color: white; padding-right: 5px;"> {tx.value/2} {(tx.value / 2) < 2 ? `Boost` : `Boosts`} </span> <span style="font-size: 12px;">({tx.value} $APE)</span>
        </div>
</li>
</a>
</center>
</div>
{/each}