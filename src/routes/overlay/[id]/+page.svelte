<script lang="ts">
    import axios from 'axios';
    import type { PageData } from './$types';
    export let data: PageData;

    let pass_data = {rank: 0, score: 0}

    async function load(){
        const response = await axios.get('https://api.dookeystats.com/pass/' + data.pass_id);
        const json = await response.data;
        pass_data = json
    }
    load()
    setInterval(load, 3000)
</script>

<style>
     @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
     :global(body) {
		background-color: black;
        background-size: cover;
        background-attachment: fixed;
        background-repeat: no-repeat;
		color: rgba(255, 255, 255, 0.7);
		transition: background-color 0.3s;
        font-family: 'Roboto', sans-serif;
	} 
    .bubble {
        background-color: purple;
        max-width: 190px;
        border-radius: 25px;
    }
    p {
        margin: 5px;
        padding-bottom: 5px;
        padding-left: 5px;
        padding-right: 0px;
        font-size: 25px;
    }
</style>

<div class="bubble">
<img style="" width="100%" src={pass_data.ape_img}>
<p>Rank: #{pass_data.rank.toLocaleString("en-US")}</p>
<p style="margin-top: -10px;">Score: {pass_data.score.toLocaleString("en-US")}</p>
</div>