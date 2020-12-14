var pool = require('./bd');

async function getContactos() {
    var query = "select * from contactos";
    var resultado = await pool.query(query);
    return resultado;
}

async function insertContactos(obj2) {
    try{
        var query = "insert into contactos set ?";
        var guardar = await pool.query(query, [obj2]);
        return guardar;
    }catch(error){
        console.log(error);
        throw error;
    }
}

async function deleteContactosById(id) {
    var query = "delete from contactos where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getContactosById(id) {
    var query = "select * from contactos where id = ?";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarContactoById(obj,id) {
    try{
        var query = "update contactos set ? where id = ?";
        var rows = await pool.query(query, [ obj, id]);
        return rows;
    }catch(error){
        throw error;
    }
}

async function buscarContactos(busqueda) {
    var query = "select * from contactos where nombre like ? OR email like ? OR comentario like ?";
    var rows = await pool.query(query, ['%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%']);
    return rows;
}

module.exports = { getContactos, insertContactos, deleteContactosById, getContactosById, modificarContactoById, buscarContactos };