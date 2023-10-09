import Status from "./StatusModel.js";

export const getStatus = async (req, res) => {
  try {
    const response = await Status.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getStatusById = async (req, res) => {
  try {
    const response = await Status.findOne({
      where: {
        id_status: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createStatus = async (req, res) => {
  try {
    await Status.create(req.body);
    res.status(201).json({ msg: "Status Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStatus = async (req, res) => {
  try {
    await Status.update(req.body, {
      where: {
        id_status: req.params.id,
      },
    });
    res.status(200).json({ msg: "Status Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteStatus = async (req, res) => {
  try {
    await Status.destroy({
      where: {
        id_status: req.params.id,
      },
    });
    res.status(200).json({ msg: "Status Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
