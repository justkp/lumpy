/*
 *********************************************************
 * Error Util
 * - This function should govern how we choose to handle errors
 *   it should be able to send out emails on fatal erros, and send out reports
 *   for any minor errors
 *********************************************************
 */

var ErrorUtil = {
    report: function(_location, _description, _data) {
        // alert(_location + " | " + _description + " | " + _data);
        console.log(_location + " | " + _description + " | " + _data);
        // TODO: send out an email when a fatal error occurs
    },
    log: function(_location, _description, _data) {
        console.log(_location, _description, _data);
        // TODO: write into analytics when an error occurs with details as to where
    }
};