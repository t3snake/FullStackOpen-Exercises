

const FilterBox = ({filter, setFilter}) => {
    return (
        <>
            find countries &nbsp;
            <input value={filter} onChange={(event) => setFilter(event.target.value)} />
        </>
    )
}

export default FilterBox