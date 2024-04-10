
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

export const pool1 = mysql.createPool({...instances[0],
    waitForConnections: true
})

export const pool2 = mysql.createPool({...instances[1],
    waitForConnections: true
})

export const pool3 = mysql.createPool({...instances[2],
    waitForConnections: true
})