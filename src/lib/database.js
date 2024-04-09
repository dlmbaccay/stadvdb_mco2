
import mysql from 'mysql2/promise'

const instances = [
	{
		host: 'ccscloud.dlsu.edu.ph',
		port: 20093,
		user: 'root',
		password: 'CXw35gRKq6yNJAm8ht2MVeWf',
		database: 'mco2_warehouse',
	},
	{
		host: 'ccscloud.dlsu.edu.ph',
		port: 20094,
		user: 'root',
		password: 'CXw35gRKq6yNJAm8ht2MVeWf',
		database: 'mco2_warehouse',
	},
	{
		host: 'ccscloud.dlsu.edu.ph',
		port: 20095,
		user: 'root',
		password: 'CXw35gRKq6yNJAm8ht2MVeWf',
		database: 'mco2_warehouse',
	},
]

const pool = mysql.createPool({...instances[0],
    waitForConnections: true
})

export default pool
