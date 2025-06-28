const db = require("../connect");
const bcrypt = require("bcrypt");

exports.InserUser = (req, res) => {
    
    const {name, email, password, role} = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({message: "يجب إكمال جميع الحقول"});
    }

    db.query("SELECT * FROM users WHERE email = ?", email, async (error, result) => {
        if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات"});
        if (result.length > 0) return res.status(400).json({message: "المستخدم موجود بالفعل"});

        const hashedPassord = await bcrypt.hash(password, 10);

        db.query("INSERT INTO users(name, email, password, role) VALUES(?, ?, ?, ?)", [name, email, hashedPassord, role], (error, result) => {
        if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات"});
        return res.status(201).json({message: "تم إضافة مستخدم جديد بنجاح"});
        });
    });

};

exports.updateUser = (req, res) => {
    
    const {name, email, oldpassword, newPassword, role} = req.body;

    if (!name || !email || !oldpassword || !role) {
        return res.status(400).json({message: "يجب إكمال جميع الحقول"});
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], async (error, result) => {
        if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات"});
        if (result.length === 0) return res.status(404).json({message: "المستخدم غير موجود"});
        
        const userData = result[0];

        const isMatch = await bcrypt.compare(oldpassword, userData.password);
    
        if (!isMatch) return res.status(400).json({message: "كلمة المرور غير صحيحة"});

        const passwordToUpdate = newPassword ? await bcrypt.hash(newPassword, 10) : userData.password;

        db.query("UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE email = ?", [name, email, passwordToUpdate, role, email], (error, result) => {
        if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات"});
        return res.status(201).json({message: "تم تحديث بيانات المستخدم بنجاح"});
        });
    });

};

exports.deleteUser = (req, res) => {
    
    const email = req.body.email;
    db.query("DELETE FROM users WHERE email = ?", email, (error, result) => {
        if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات"});
        return res.status(200).json({message: "تم حذف المستخدم بنجاح"});
})};