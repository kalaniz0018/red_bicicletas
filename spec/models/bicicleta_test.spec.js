var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var server = require('../../bin/www');
var request = require('request');

//const { response } = require('express');

var base_url = "http://localhost:5000/api/bicicletas";

describe('Bicicleta API', () =>{
    describe("GET BICICLETAS /", () => {
        it("status 200", () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1, "rojo", "urbana", [-34.626113, -58.444011])
            Bicicleta.add(a);

            request.get("http://localhost:5000/api/bicicletas", function(error, response, body){
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe("POST BICICLETAS /create", () => {
        it("STATUS 200", (done) => {
            var header = {'content-type' : 'application/json'};
            var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54}';
            request.post({
                headers: headers,
                url: 'http://localhost:5000/api/bicicletas/create',
                body: aBici
            }, function(error, response, body) {
                expect(response, statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("rojo");
                done();
            });
        });
    });
});





/*describe('Testing Bicicletas', function () {
  beforeAll(function (done) {
    var mongoDB = 'mongodb://localhost/testdb';
    mongoose.connect(mongoDB, { useNewUrlParser: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
      console.log('we are connected to test database!');
      done();
    });
  });
  afterEach(function (done) {
    Bicicleta.deleteMany({}, function (err, success) {
      if (err) console.log(err);
      done();
    });
  });


  describe('Bicicleta.createInstance', () => {
    it('crea una instancia de Bicicleta', () => {
      var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);


      expect(bici.code).toBe(1);
      expect(bici.color).toBe("verde");
      expect(bici.modelo).toBe("urbana");
      expect(bici.ubicacion[0]).toEqual(-34.5);
      expect(bici.ubicacion[1]).toEqual(-54.1);
    })
  });

  describe('Bicicleta.allBicis', () => {
    it('comienza vacia', (done) => {
      Bicicleta.allBicis(function (err, bicis) {
        expect(bicis.length).toBe(0);
        done();
      });
    });
  });

  describe('Bicicleta.add', () => {
    it('agrega solo una bici', (done) => {
      var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
      Bicicleta.add(aBici, function (err, newBici) {
        if (err) console.log(err);
        Bicicleta.allBicis(function (err, bicis) {
          expect(bicis.length).toEqual(1);
          expect(bicis[0].code).toEqual(aBici.code);

          done();
        });
      });
    });
  });

  describe('Bicicleta.findByCode', () => {
    it('debe devolver la bici con code 1', (done) => {
      Bicicleta.allBicis(function (err, bicis) {
        expect(bicis.length).toBe(0);

        var aBici1 = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
        Bicicleta.add(aBici1, function (err, newBici) {
          if (err) console.log(err);

          var aBici2 = new Bicicleta({ code: 2, color: "rojo", modelo: "urbana" });
          Bicicleta.add(aBici2, function (err, newBici) {
            if (err) console.log(err);
            Bicicleta.findByCode(1, function (error, targetBici) {
              expect(targetBici.code).toBe(aBici1.code);
              expect(targetBici.color).toBe(aBici1.color);
              expect(targetBici.modelo).toBe(aBici1.modelo);

              done();
            });
          });
        });
      });
    });
  });

});

beforeEach(() => { Bicicleta.allBicis = []; });
describe('Bicicleta.allBicis', () => {
    it('comienza vacia', () =>{
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('agregamos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
  });

  describe('Bicicleta.findById', () => {
    it('debe devolver la bici con id 1', () => {
      expect(Bicicleta.allBicis.length).toBe(0);
      var aBici = new Bicicleta(1, "verde", "urbana");
      var aBici2 = new Bicicleta(2, "rojo", "montaña");
      Bicicleta.add(aBici);
      Bicicleta.add(aBici2);

      var targetBici = Bicicleta.findById(1);
      expect(targetBici.id).toBe(1);
      expect(targetBici.color).toBe(aBici.color);
      expect(targetBici.modelo).toBe(aBici.modelo);


    });
});
*/
