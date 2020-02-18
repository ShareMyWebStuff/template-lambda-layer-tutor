'use strict';
const db = require ('/opt/nodejs/services/db').mysqlDB();

const tutorModel = () => {

    // 
    // Function : selectTutorByUsername
    //
    // Returns the tutors that match a username
    //
    // ReturnValues :
    //  Success
    //      error       True if error occurred
    //      rows        This contains the number of records found
    //      user        This returns the users details
    // 
    //  Failure
    //      error       True if error occurred
    //      errNo       The MySQL error numner
    //      errMsg      The MySQL error message
    //      sqlState    The Mysql sqlState
    //  
    async function selectTutorByUsername (userName) {

        try {
            await db.connectToDB();
            const sql = `SELECT user_id, email, username, type, password, validated, TIMESTAMPDIFF(MINUTE, create_date, now()) as created_mins FROM smt_user_login where username = '${userName}'`;
            const res = await db.selectData (sql);

            const userDets = {
                error : res.error,
                rows : res.rows,
                user  : []
            };

            res.data.forEach( ({user_id, email, username, password, validated, created_mins}) => {
                userDets.user.push ({user_id, email, username, password, validated, created_mins });
            });

            return (userDets);

        }catch (err) {

            const userDets = {
                error    : true,
                errNo    : err.errno,
                errMsg   : err.sqlMessage,
                sqlState : err.sqlState
            };

            return (userDets);
        }

    }


    // 
    // Function : selectTutorById
    //
    // Returns the tutors that match a user id
    //
    // ReturnValues :
    //  Success
    //      error       True if error occurred
    //      rows        This contains the number of records found
    //      user        This returns the users details
    // 
    //  Failure
    //      error       True if error occurred
    //      errNo       The MySQL error numner
    //      errMsg      The MySQL error message
    //      sqlState    The Mysql sqlState
    //  
    async function selectTutorById (whereObj) {

        try {
            await db.connectToDB();
            const sql = 'SELECT * FROM smt_user_login '  + db.createWhereClause (whereObj);
            const res = await db.selectData (sql);

            const userDets = {
                error : res.error,
                rows : res.rows,
                user  : []
            };

            res.data.forEach( ({user_id, email, username, validated}) => {
                userDets.user.push ({user_id, email, username, validated });
            });

            return (userDets);

        }catch (err) {

            const userDets = {
                error    : true,
                errNo    : err.errno,
                errMsg   : err.sqlMessage,
                sqlState : err.sqlState
            };

            return (userDets);
        }
    }


    // 
    // Function : saveTutor
    //
    // Inserts a new user
    //
    // ReturnValues :
    //  Success
    //      error           True if error occurred
    //      errNo           The mySql error
    //      user_id         The unique identifier of the added user    
    //      affectedRows    The number of rows affected in the database
    //      changedRows     The number of rows changed in the database
    // 
    //  Failure
    //      error       True if error occurred
    //      errNo       The MySQL error numner
    //      errMsg      The MySQL error message
    //      sqlState    The Mysql sqlState
    //  
    async function saveTutor (user) {

        const userDets = { };

        if (user !== undefined)
        {
            try {

                await db.connectToDB();
                const sql = `CALL sp_insert_login_details( '${user.email}', '${user.username}', ${user.type}, '${user.password}', 'N' ); `;
                const res = await db.insertProcedure( sql );

                if ( !res.error ){
                    userDets.error = false;
                    userDets.errNo = 0;
                    userDets.user_id = res.insertId;
                    userDets.affectedRows = res.affectedRows;
                    userDets.changedRows = res.changedRows;
                } else {
                    userDets.error = true;
                    userDets.errNo = 998;
                    userDets.errMsg = res.errMsg;
                    userDets.sqlState = res.sqlState;
                }
        
            }catch (err) {
                userDets.error = false;
                userDets.errNo = err.errno;
                userDets.errMsg = err.sqlMessage;
                userDets.sqlState = err.sqlState;
            }
        
        } else {
            userDets.error = true;
            userDets.errNo = 999;
            userDets.errMsg = 'No user details were passed in.';
            userDets.sqlState = undefined;

        }

        return (userDets);
    }

    // 
    // Function : updateTutor
    //
    // Updates an existing user
    //
    // ReturnValues :
    //  Success
    //      error           True if error occurred
    //      errNo           The mySql error
    //      user_id         The unique identifier of the changed user    
    //      affectedRows    The number of rows affected in the database
    //      changedRows     The number of rows changed in the database
    // 
    //  Failure
    //      error       True if error occurred
    //      errNo       The MySQL error numner
    //      errMsg      The MySQL error message
    //      sqlState    The Mysql sqlState
    //  
    async function updateTutor (user_id, user) {

        const userDets = { };

        if (user !== undefined)
        {
            try {

                await db.connectToDB();
                const sql = `CALL sp_update_login_details( ${user_id}, '${user.email}', '${user.username}', ${user.type}, '${user.password}', 'N' ); `;
                const res = await db.insertProcedure( sql );

                if ( !res.error ){
                    userDets.error = false;
                    userDets.errNo = 0;
                    userDets.user_id = res.insertId;
                    userDets.affectedRows = res.affectedRows;
                    userDets.changedRows = res.changedRows;
                } else {
                    userDets.error = true;
                    userDets.errNo = 997;
                    userDets.errMsg = res.errMsg;
                    userDets.sqlState = res.sqlState;
                }
        
            }catch (err) {
                userDets.error = false;
                userDets.errNo = err.errno;
                userDets.errMsg = err.sqlMessage;
                userDets.sqlState = err.sqlState;
            }
        
        } else {
            userDets.error = true;
            userDets.errNo = 999;
            userDets.errMsg = 'No user details were passed in.';
            userDets.sqlState = undefined;

        }

        return (userDets);
    }

    // 
    // Function : deleteTutor
    //
    // Updates an existing user
    //
    // ReturnValues :
    //  Success
    //      error           True if error occurred
    //      errNo           The mySql error
    //      user_id         The unique identifier of the changed user    
    //      affectedRows    The number of rows affected in the database
    //      changedRows     The number of rows changed in the database
    // 
    //  Failure
    //      error       True if error occurred
    //      errNo       The MySQL error numner
    //      errMsg      The MySQL error message
    //      sqlState    The Mysql sqlState
    //  
    async function deleteTutor (user_id) {

        const userDets = { };

        try {

            await db.connectToDB();
            const sql = 'DELETE FROM smt_user_login ' + db.createWhereClause ( { user_id } );
            const res = await db.saveData(sql);
                
            if ( !res.error ){
                userDets.error = false;
                userDets.errNo = 0;
                userDets.user_id = res.insertId;
                userDets.affectedRows = res.affectedRows;
                userDets.changedRows = res.changedRows;
            } else {
                userDets.error = true;
                userDets.errNo = 998;
                userDets.errMsg = res.errMsg;
                userDets.sqlState = res.sqlState;
            }
    
        }catch (err) {
        
            userDets.error = false;
            userDets.errNo = err.errno;
            userDets.errMsg = err.sqlMessage;
            userDets.sqlState = err.sqlState;
        }
        
        return (userDets);
    }

    return {
        selectTutorByUsername,
        selectTutorById,
        saveTutor,
        updateTutor,
        deleteTutor
    };

}

module.exports.tutorModel              = tutorModel;
