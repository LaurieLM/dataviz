import  { useState, useEffect } from 'react';

export default function API() { 

    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        try {
            const response = await fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=20')
            const res = await response.json();

            setData(res.results);
            console.log("Données récupérées", res.results);
        } catch (error) {
            console.log("Erreur", error)
        }
    }

    return (
        <div>
            <p>it's ok ! </p> 
            <h2>API Component</h2>
        </div>
    )
}
