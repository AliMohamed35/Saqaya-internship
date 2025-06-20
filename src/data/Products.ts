export interface Product {
    id: number;
    image: string;
    title: string;
    price: number;
    description: string;
    rating: any;
    rate: number;
    category: string;
}

// Fetching data from the endpoint
export async function fetchData(): Promise<Product[]> {
    let res = await fetch('https://fakestoreapi.com/products');

    if (!res.ok) throw new Error('failed to fetch data') // error handling
    return await res.json(); //  convert to json format
}