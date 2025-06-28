const db = require("../connect");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
    
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message: "يجب إكمال جميع الحقول"});
    }
    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email], async (error, result) => {
        
        if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات"});
        if (result.length === 0) return res.status(404).json({message: "المستخدم غير موجود"});
        
        const userData = result[0];

        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) return res.status(401).json({message: "البريد الإلكتروني أو كلمة المرور غير صحيحة"});

        return res.status(200).json({message: "تم تسجيل الدخول بنجاح"});
    });

};