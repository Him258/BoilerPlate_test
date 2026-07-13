const departmentService = require('./department.service');

exports.getAll = async (req, res) => {
  try {
    const departments = await departmentService.getAllDepartments(req.query.tenantId);
    res.json({ success: true, data: departments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newDepartment = await departmentService.createDepartment(req.body);
    res.status(201).json({ success: true, data: newDepartment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await departmentService.updateDepartment(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await departmentService.deleteDepartment(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
