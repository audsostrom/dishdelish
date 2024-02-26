import Link from 'next/link';
import { redirect } from 'next/navigation';
import './recipe-transformer.css';

async function query(data) {
   "use server";
	const response = await fetch(
		"https://api-inference.huggingface.co/models/flax-community/t5-recipe-generation",
		{
			headers: { Authorization: "Bearer {API_TOKEN}" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

export default async function Transformer() {
   let results = await query({"inputs": "provolone cheese, bacon, spinach"})
   console.log(results)

  return (
    <div className="transformer-container">
      <div>Transformer Test</div>
    </div>
  );
}
