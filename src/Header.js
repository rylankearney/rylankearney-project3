import React from "react"
import Karen from "./Karen1.jpeg"

const Header = () => {
	return (
		<>
		<div className="headerFlex">
			<h1>Welp.</h1>
			<img src={Karen} alt="Drawing of a Karen looking upset" />
		</div>
			<h2>Got a customer complaint?</h2>
		</>
	)
}

export default Header