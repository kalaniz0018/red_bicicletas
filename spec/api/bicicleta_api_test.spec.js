var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var server = require('../../bin/www');
var request = require('request');


var base_url = "http://localhost:5000/api/bicicletas";


describe('Bicicleta API', () => {
    describe('GET BICICLETAS /', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1, 'negro', "urbana", [-34.6012424, -54.38614971]);
            Bicicleta.add(a);

            request.get('http://localhost:5000/api/bicicletas', function (error, response, body) {
                expect(response.statusCode).toBe(200);

            });
        });
    });


    describe('POST BICICLETAS/create', () => {
        it('STATUS 200', (done) => {
            var headers = { 'content-type': 'application/json' };
            var aBici = '{"id": 100 , "color":"rojo", "modelo":"pista", "lat":-34, "lng":-54 }';
            request.post({
                headers: headers,
                url: 'http://localhost:5000/api/bicicletas/create',
                body: aBici
            }, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("rojo");

                done();//helps to tell a jasmine(library) wait for the execution of request to finalize the test
            });
        });
    });
}); 