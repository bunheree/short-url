import fs from 'fs'

const dataPath = '/data/test.json'

export default async function POST(req, res) {
    if (req.method === 'POST') {
        try {
            const newData = req.body // Assuming you are sending data in the request body

            console.log(newData)

            // Read the existing JSON file
            const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

            // Update the data
            const updatedData = [...currentData, newData]

            // Write the updated data back to the JSON file
            fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2), 'utf-8')

            res.status(200).json({ success: true, data: updatedData })
        } catch (error) {
            console.error(error)
            res.status(500).json({ success: false, error: 'Internal Server Error' })
        }
    } else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' })
    }
}