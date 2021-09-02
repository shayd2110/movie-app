import React from "react";

function SearchBox(props) {
	return (
		<div className="col col-sm-4">
			<input
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				className="form-control"
				placeholder="Type to search"
			></input>
		</div>
	);
}

export default SearchBox;
