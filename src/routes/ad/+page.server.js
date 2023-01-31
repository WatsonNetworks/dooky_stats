import { redirect } from '@sveltejs/kit';
import axios from 'axios';


 export async function load() {
   await axios.get('https://api.dookeystats.com/ad/click');
   throw redirect(302, 'https://twitter.com/DookeyDashBoost');
 }