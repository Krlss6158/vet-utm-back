import app from './src/server';

const port = Number(process.env.port || 3001)

app.listen(port, () => {
    console.log(`🚀 server running on port: ${port}!!`)
})