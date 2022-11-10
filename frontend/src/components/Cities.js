import { useEffect, useState } from 'react';

function Cities() {

    const [cities, setCities] = useState({cities : []});

    useEffect(() => {
    fetch('/list')
    .then (res => res.json())
    .then (result => {
      setCities({
        cities: result.cities
      });
      console.log(result.cities);
    });
    }, [])

    return (
        <div>
        </div>
    );
}

