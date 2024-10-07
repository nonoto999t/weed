document.addEventListener('DOMContentLoaded', function() {
    const shopGrid = document.getElementById('shopGrid');
    const ratingFilter = document.getElementById('ratingFilter');

    async function loadShops() {
        const response = await fetch('data.csv');
        const data = await response.text();
        const shops = parseCSV(data);
        displayShops(shops);
    }

    function parseCSV(data) {
        const rows = data.split('\n').slice(1); 
        return rows.map(row => {
            const cols = row.split(',');
            return {
                name: cols[0],
                address: cols[1],
                phone: cols[2],
                category: cols[3],
                website: cols[4],
                rating: parseFloat(cols[5]),
                imageUrl: cols[22],
                reviews: [cols[15], cols[17], cols[19]],
                reviewScores: [parseFloat(cols[16]), parseFloat(cols[18]), parseFloat(cols[20])],
            };
        });
    }

    function displayShops(shops) {
        shopGrid.innerHTML = '';
        shops.forEach(shop => {
            const shopCard = document.createElement('div');
            shopCard.classList.add('shopCard');

            const imageUrl = shop.imageUrl ? shop.imageUrl : 'photo.jpg';

            shopCard.innerHTML = `
                <img src="${imageUrl}" alt="${shop.name}" class="shopImage">
                <div class="shopDetails">
                    <h2>${shop.name}</h2>
                    <p>Rating: ${shop.rating} ★</p>
                    <p>${shop.address}</p>
                    <a href="tel:${shop.phone}" class="callButton">Call: ${shop.phone}</a>
                </div>
            `;
            shopGrid.appendChild(shopCard);
        });
    }

    function filterByRating(shops, rating) {
        return shops.filter(shop => shop.rating >= rating);
    }

    ratingFilter.addEventListener('change', function() {
        const selectedRating = parseFloat(this.value);
        const filteredShops = (selectedRating === "all") ? shops : filterByRating(shops, selectedRating);
        displayShops(filteredShops);
    });

    loadShops();
});
