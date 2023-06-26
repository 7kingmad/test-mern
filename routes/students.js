const router = require("express").Router();
let Student = require("../models/student");

//adding student

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender;

  const newStudent = new Student({
    name,
    age,
    gender,
  });

  newStudent
    .save()
    .then(() => {
      res.json("Student Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//see all students

router.route("/").get((req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update student

router.route("/update/:id").put(async (req, res) => {
  let studentId = req.params.id;
  const { name, age, gender } = req.body;

  const updateStudent = {
    name,
    age,
    gender,
  };

  const update = await Student.findByIdAndUpdate(studentId, updateStudent)
    .then(() => {
      res.status(200).send({ status: " student updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Update fail", error: err.message });
    });
});

//delete sutdent

router.route("/delete/:id").delete(async (req, res) => {
  let studentId = req.params.id;

  await Student.findByIdAndDelete(studentId)
    .then(() => {
      res.status(200).send({ status: "Student deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting student", error: err.message });
    });
});

//get one student

router.route("/get/:id").get(async (req, res) => {
  let studentId = req.params.id;

  const student = await Student.findById(studentId)
    .then((stud) => {
      res.status(200).send(stud);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: " Fetching student failed", error: err.message });
    });
});

module.exports = router;
