const db = require("../connect");

exports.getProjects = (req, res) => {

    db.query("SELECT * FROM qimadashboard.projects", (error, result) => {

        if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات"});

        if (result.length === 0) return res.status(404).json({message: "لايوجد معاملات"});

        return res.status(200).json({message: "تم جلب المعاملات بنجاح", data: result});
    })
    
}

exports.addProject = (req, res) => {
    
    const {name, type, hood, longitude, latitude} = req.body;

    if (!name || !type || !hood || !longitude || !latitude) {
        return res.status(400).json({message: "يجب إكمال جميع الحقول"});
    }

    db.query("SELECT * FROM qimadashboard.projects WHERE name = ?", name, (error, result) => {
        
        if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات"});

        if (result.length > 0) return res.status(400).json({message: "المعاملة موجودة بالفعل"});

        db.query("INSERT INTO qimadashboard.projects(name, hood, sort_type, longitude, latitude) VALUES (?, ?, ?, ?, ?)", [name, hood, type, longitude, latitude], (error, result) => {
            
            if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات", error: error.message});

            res.status(201).json({message: "تم إضافة معاملة جديدة بنجاح"});

        });
    })

}

exports.deleteProject = (req, res) => {
    const name = req.body.name;
    db.query("DELETE FROM qimadashboard.projects WHERE name = ?", name, (error, result) => {
        if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات"});
        res.status(200).json({message: "تم حذف المعاملة بنجاح"});
    })
}

exports.editProject = (req, res) => {
    const {originalName, name, type, hood, longitude, latitude} = req.body;

    if (!originalName || !name || !type || !hood || !longitude || !latitude) {
        return res.json({message: "يجب إكمال جميع الحقول"});
    }

    db.query("SELECT * FROM qimadashboard.projects WHERE name = ?", [originalName], (error, result) => {
        
        if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات"});
        
        if (result.length === 0) return res.status(404).json({message: "المعاملة غير موجودة"});

        db.query("UPDATE qimadashboard.projects SET name = ?, hood = ?, sort_type = ?, longitude = ?, latitude = ? WHERE name = ?", [name, hood, type, longitude, latitude, originalName], (error, result) => {
    
            if (error) return res.status(500).json({message: "خطأ في قاعدة البيانات", error: error.message});

            res.status(200).json({message: "تم تعديل المعاملة بنجاح"});

        });
    })

}