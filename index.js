const mysql2=require("mysql2")


const express=require('express')

const app =express();
const PORT=3000;
app.use(express.json())

const DBConnection=mysql2.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'c43blogapp'


})
DBConnection.connect(err=>{
    if(err){
        console.error("fail to connect db");
    }
    else{
        console.error("connected to db established");
    }
})

app.patch("/user/:id", (req, res) => {
  const { id } = req.params;
  const { DOB, gender } = req.body;

  DBConnection.execute(
    `UPDATE users SET u_DOB = ?, u_gender = ? WHERE u_id = ?`,
    [DOB, gender, id],
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: "❌ Failed to execute query", error: err.message });
      }

      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "❗ User not found" });
      }

      return res.status(200).json({ message: "✅ User updated successfully" });
    }
  );
});


app.get("/user", (req, res) => {
  const { searchKey } = req.query;

  DBConnection.execute(
    `SELECT * FROM users WHERE u_lastName LIKE ?`,
    [`${searchKey}%`],
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: "❌ Failed to execute query", error: err.message });
      }

      return res.status(200).json({ message: "✅ Success", data });
    }
  );
});


app.delete("/user/:id", (req, res) => {
  const { id } = req.params;


  DBConnection.execute(
    `DELETE FROM USERS WHERE u_id = ?`,
    [id],
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: "❌ Failed to execute query", error: err.message });
      }

      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "❗ User not found" });
      }

      return res.status(200).json({ message: "✅ User delete successfully" });
    }
  );
});




app.get("/user/:id/profile", (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      u_id AS id,
      CONCAT(u_firstName, ' ', u_lastName) AS userName,
      u_email AS email,
      FLOOR(DATEDIFF(NOW(), u_DOB) / 365) AS age
    FROM users 
    WHERE u_id = ?
  `;

  DBConnection.execute(query, [id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "❌ Failed to execute this query", error: err.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "❗ User not found" });
    }

    return res.status(200).json({ message: "✅ Success", user: data[0] });
  });
});

app.get("/",(req,res,next)=>{
    DBConnection.execute(`SELECT * FROM USERS WHERE u_id=?`,[req.query.id],(err,data)=>{
        if(err){
            return res.status(500).json({message:"fail  to execute this query ",err})
        }
    return res.status(200).json({message:"Done",data})

    })
})

app.post('/auth/signup',(req,res,next)=>{
    const{firstName,lastName,email,password}=req.body;
    console.log({firstName,lastName,email,password});

    DBConnection.execute(`SELECT u_email from users where u_email=?`,[email],(err,data)=>{
if(err){
    return res.status(500).json({message:"fail to excute this query",err})
}
if (data.length>0){
return res.status(409).json({message:"email exist",data})
}
DBConnection.execute( `insert into users (u_firstName,u_lastName,u_email,u_password) values(?,?,?,?)`,[firstName.trim(),lastName.trim(),email,password],(err,data)=>{
    if (err || data.affectedRows==0){
        return res.status(500).json({message:"fail to execute this query",err})
    }
    return res.status(201).json({message:"done",data})
})
// if (data.length){
// return res.status(409).json({message:"Email exist"})
// }
// DBConnection.execute( `insert into users (u_firstName,u_lastName,u_email,u_password) values(?,?,?,?)`,[firstName,lastName,email,password],(err,data)=>{
//     if (err){
//         return res.status(500).json({message:"fail to execute this query"},err)
//     }
//     return res.json({message:"done",data})
// })

})
})

app.post('/auth/login',(req,res,next)=>{
    const{email,password}=req.body;
    console.log({email,password});

    DBConnection.execute(`SELECT * from users where u_email=? and u_password=?`,[email,password],(err,data)=>{
if(err){
    return res.status(500).json({message:"fail to excute this query",err})
}
if (!data.length){
return res.status(404).json({message:"email and password mismatch",data})
}
return res.status(200).json({message:"Done",user:data[0].u_id})


})
})




app.get("/blog",(req,res,next)=>{
  DBConnection.execute(`select * from blogs`,
    (err,data)=>{
      if(err){
        return res.status(500).json({message:"fail to excute this query",err})
      }
      return res.status(200).json({message:"Done",data})
    }
  )
})


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})