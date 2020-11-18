var express = require("express");
var router = express.Router();
const models = require("../db/models");
const todoModel = models.todoModel;

router.post("/api/getData", function (req, res) {
  const obj = {};
  todoModel.find(obj, function (err, todo) {
    if (err) {
      res.send({
        code: 1,
        errorMsg: "失败获取数据",
      });
    } else {
      res.send(todo);
    }
  });
});


router.post("/api/addItem", function (req, res) {
  const todo = new todoModel({
    id: req.body.id,
    content: req.body.content,
    status: req.body.status,
  });
  todo.save(function (err, todo) {
    if (err) {
      res.send({
        code: 1,
        errorMsg: "增加失败",
      });
    } else {
      res.send({
        code: 0,
        message: "增加成功",
      });
    }
  });
});


router.post("/api/delItem", function (req, res) {
  const id = req.body.id;
  const ID = { id: id };
  todoModel.remove(ID, function (err, todo) {
    if (err) {
      res.send({
        code: 1,
        errorMsg: "删除失败",
      });
    } else {
      res.send(todo);
    }
  });
});


router.post("/api/changeItem", function (req, res) {
  const id = req.body.id;
  const status = req.body.status;
  const upaderStr = {
    status: status === 1 ? 0 : 1,
  };
  todoModel.findOneAndUpdate({ id: id }, upaderStr, function (err, todo) {
    if (err) {
      res.send({
        code: 1,
        errorMsg: "改变失败",
      });
    } else {
      res.send(todo);
    }
  });
});
module.exports = router;
