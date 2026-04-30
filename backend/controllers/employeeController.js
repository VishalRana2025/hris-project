export const getMyEmployee = async (req, res) => {
  try {
    const userEmail = req.user.email; // from JWT

    const employee = await Employee.findOne({
      workEmail: userEmail
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found for this user"
      });
    }

    res.json(employee);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};