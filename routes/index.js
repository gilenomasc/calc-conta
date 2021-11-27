const express = require('express');
const calculo = require('../public/javascripts/calculadora');
const router = express.Router();
const db = require('../util/db');

/* GET home page. */
router.get('/', function (req, res, next) {
  return res.render('index');
});

router.get('/agua', (req, res) => {
  db.query('SELECT * FROM agua', [], (err, result) => {
    if (err) {
      return res.status(200).send(err);
    }
    return res.render('agua', { tabagua: result })
  });

});
router.get('/luz', (req, res) => {
  db.query('SELECT * FROM luz', [], (err, result) => {
    if (err) {
      return res.status(200).send(err);
    }
    return res.render('luz', { tabluz: result })
  });

});
router.get('/aguaedit', (req, res) => {
  db.query('SELECT * FROM agua', [], (err, result) => {
    if (err) {
      return res.status(200).send(err);
    }
    return res.render('agua_edit', { tabagua: result })
  });

});

router.get('/luzedit', (req, res) => {
  db.query('SELECT * FROM luz', [], (err, result) => {
    if (err) {
      return res.status(200).send(err);
    }
    return res.render('luz_edit', { tabluz: result })
  });

});

router.post('/aguasave', (req, res) => {
  db.query('UPDATE agua SET preco = ? WHERE id = ?;', [req.body.n1, 1], (err, result) => {
    if (err) {
      return res.status(200).send(err);
    }
  });
  db.query('UPDATE agua SET preco = ? WHERE id = ?;', [req.body.n2, 2], (err, result) => {
    if (err) {
      return res.status(200).send(err);
    }
  });
  db.query('UPDATE agua SET preco = ? WHERE id = ?;', [req.body.n3, 3], (err, result) => {
    if (err) {
      return res.status(200).send(err);
    }
  });
  db.query('UPDATE agua SET preco = ? WHERE id = ?;', [req.body.n4, 4], (err, result) => {
    if (err) {
      return res.status(200).send(err);
    }
  });
  db.query('UPDATE agua SET preco = ? WHERE id = ?;', [req.body.n5, 5], (err, result) => {
    if (err) {
      return res.status(200).send(err);
    }
  });
  res.redirect('/agua')

});
router.post('/luzsave', (req, res) => {
  db.query('UPDATE luz SET tarifa = ? WHERE id = ?;', [req.body.n1, 1], (err, result) => {
    if (err) {
      return res.status(200).send(err);
    }
  });
  db.query('UPDATE luz SET tarifa = ? WHERE id = ?;', [req.body.n2, 2], (err, result) => {
    if (err) {
      return res.status(200).send(err);
    }
  });
  db.query('UPDATE luz SET tarifa = ? WHERE id = ?;', [req.body.n3, 3], (err, result) => {
    if (err) {
      return res.status(200).send(err);
    }
  });
  db.query('UPDATE luz SET tarifa = ? WHERE id = ?;', [req.body.n4, 4], (err, result) => {
    if (err) {
      return res.status(200).send(err);
    }
  });
  db.query('UPDATE luz SET tarifa = ? WHERE id = ?;', [req.body.n5, 5], (err, result) => {
    if (err) {
      return res.status(200).send(err);
    }
  });
  db.query('UPDATE luz SET tarifa = ? WHERE id = ?;', [req.body.n6, 6], (err, result) => {
    if (err) {
      return res.status(200).send(err);
    }
  });
  res.redirect('/luz')

});
router.post('/ac', (req, res) => {
  let precos = [];
  let consumo = +req.body.atual - +req.body.anterior
  db.connect(function (err) {
    if (err) throw err;
    db.query("SELECT preco FROM agua", (err, result, fields) => {
      if (err) throw err;
      Object.keys(result).forEach((key) => {
        var row = result[key];
        precos.push(+row.preco);
      });
      // res.send('<p>' + calculo(req.body.consumo, precos) + '</p>')
      return res.render('agua_res', { str: calcAgua(consumo, precos), pag: '/agua' });
    });
  });
});

router.post('/lc', (req, res) => {
  let precos = [];
  let bodyConsumo = +req.body.atual - +req.body.anterior;
  let arrForm = {
    bandeira: req.body.bandeira,
    consumo: bodyConsumo,
    cofins: req.body.cofins,
    pispasep: req.body.pispasep,
    txmunicip: req.body.txmunicip,
    multa: req.body.multa,
    mora: req.body.mora,
    outros: req.body.outros
  }
  db.connect(function (err) {
    if (err) throw err;
    db.query("SELECT tarifa FROM luz", (err, result, fields) => {
      if (err) throw err;
      Object.keys(result).forEach((key) => {
        var row = result[key];
        precos.push(+row.tarifa);
      });
      return res.render('agua_res', { str: calcLuz(arrForm, precos), pag: '/luz' })
    });
  });

  // res.send('<p>' + calcLuz(precos, arrForm) + '</p>')

});

module.exports = router;

