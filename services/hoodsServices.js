const db = require("../connect");
const bcrypt = require("bcrypt");

exports.getHoods = (req, res) => {

    db.query("SELECT * FROM qimadashboard.hoods", (error, result) => {

        if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات"});

        return res.status(200).json({message: "تم جبل الأحياء بنجاح", data: result});        

    });

};

exports.addHood = (req, res) => {
    
    const name = req.body.name;

    if (!name) {
        return res.status(400).json({message: "يجب كتابة إسم الحي"});
    }

    db.query("SELECT * FROM qimadashboard.hoods WHERE name = ?", [name], (error, result) => {
        if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات"});
        if (result.length > 0) return res.status(400).json({message: "الحي موجود بالفعل"});

        db.query("INSERT INTO qimadashboard.hoods(name) VALUES(?)", [name], (error, result) => {
        if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات"});
        return res.status(201).json({message: "تم إضافة حي جديد بنجاح"});
        });
    });

};

exports.deleteHood = (req, res) => {
    
    const name = req.body.name;
    db.query("DELETE FROM qimadashboard.hoods WHERE name = ?", name, (error, result) => {
        if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات"});
        return res.status(200).json({message: "تم حذف الحي بنجاح"});
})};

exports.editHood = (req, res) => {
    
    const {name, originalHoodName} = req.body;

    if (!name) {
        return res.status(400).json({message: "يجب كتابة إسم الحي"});
    }

    db.query("SELECT * FROM qimadashboard.hoods WHERE name = ?", [originalHoodName], (error, result) => {
        if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات"});
        if (result.length === 0) return res.status(404).json({message: "الحي غير موجود"});
    
        db.query("UPDATE qimadashboard.hoods SET name = ? WHERE name = ?", [name, name], (error, result) => {
        if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات"});
        return res.status(201).json({message: "تم تحديث بيانات الحي بنجاح"});
        });
    });

};