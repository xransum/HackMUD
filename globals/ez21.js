/* Wrapper Script for EZ_21 locks. */
function (context, args) {
    var target = args.t;
    var resp = target.call({});
    var passwds = ["unlock", "open", "release"];
    var call_args = {};

    // Check if the first lock is EZ_21
    if (resp.includes("EZ_21")) {
        // Iterate over each of the passwds
        for (var i = 0; i < passwds.length; i++) {
            var passwd = passwds[i];
            // Set the args we're passing to the target, then store the output
            // to a variable.
            call_args.EZ_21 = passwd;
            resp = target.call(call_args);

            // Kill the process when we have a success.
            if (resp.includes("`NLOCK_UNLOCKED` EZ_21")) {
                break;
            }
            else {
                // Do nothing
            }
        }
    }
    else {
        // Do nothing
    }
    
    return resp;
}