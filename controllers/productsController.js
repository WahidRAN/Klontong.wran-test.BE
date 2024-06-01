import pool from "../config/db.js";

const productsTable = "public.products";

export const getAllProducts = async (req, res) => {
	try {
		const result = await pool.query(`SELECT * FROM ${productsTable}`);
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

export const getProductById = async (req, res) => {
	const { id } = req.params;

	try {
		const result = await pool.query(
			`SELECT * FROM ${productsTable} WHERE id = $1`,
			[id]
		);
		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Product not found" });
		}
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

export const createProduct = async (req, res) => {
	const {
		category_id,
		category_name,
		sku,
		name,
		description,
		weight,
		width,
		length,
		height,
		image,
		harga,
	} = req.body;

	// Basic input validation
	if (
		!category_id ||
		!category_name ||
		!sku ||
		!name ||
		!description ||
		!harga
	) {
		return res.status(400).json({ error: "Required fields are missing" });
	}

	try {
		const result = await pool.query(
			`INSERT INTO ${productsTable} 
            (category_id, category_name, sku, name, description, weight, width, length, height, image, harga) 
          VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
          RETURNING *`,
			[
				category_id,
				category_name,
				sku,
				name,
				description,
				weight,
				width,
				length,
				height,
				image,
				harga,
			]
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error("Error creating product:", err);
		if (err.code === "23505") {
			// Assuming '23505' is the code for a unique violation
			res.status(409).json({ error: "Product with this SKU already exists" });
		} else if (err.code === "22P02") {
			// Assuming '22P02' is the code for invalid input syntax
			res.status(400).json({ error: "Invalid input syntax" });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const {
		category_id,
		category_name,
		sku,
		name,
		description,
		weight,
		width,
		length,
		height,
		image,
		harga,
	} = req.body;
	try {
		const result = await pool.query(
			`UPDATE ${productsTable} SET category_id = $1, category_name = $2, sku = $3, name = $4, description = $5, weight = $6, width = $7, length = $8, height = $9, image = $10, harga = $11 WHERE id = $12 RETURNING *`,
			[category_id, category_name, sku, name, description, weight, width, length, height, image, harga, id]
		);
		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Product not found" });
		}
		res.json(result.rows[0]);
	} catch (err) {
		res.status(400).json({ error: "Invalid input" });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool.query(
			`DELETE FROM ${productsTable} WHERE id = $1 RETURNING *`,
			[id]
		);
		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Product not found" });
		}
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};
