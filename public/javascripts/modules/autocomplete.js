function autocomplete(input, latInput, lngInput) {
    if (!input) return; // skip this fn deom running if there is not input on the page
    const dropdown = new google.maps.places.Autocomplete(input);

    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        return place
    })
}

export default autocomplete;
