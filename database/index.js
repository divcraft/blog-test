const database = () => {
   const mongoose = require('mongoose');
   mongoose.connect(process.env.DB_URI, { newUrlParser: true })

   const db = mongoose.connection
   db.on('error', console.error.bind(console, 'connection error'))
   db.once('open', () => {
      console.log(`here's mongoose, we're connected!`)
   })
}

module.exports = database