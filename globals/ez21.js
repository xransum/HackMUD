function (context, args) { // target: ""
	/* Crack script for EZ_21 locks. */
    var target = (args !== null) ? args.t : null;
    var response = (target !== null) ? target.call({}) : null;
    var passwds = ["unlock", "open", "release"];
    var call_args = {};
	
	// Fail out when no target is provided
	if (target == null || target.trim() != "") {
		return {
			ok: false,
			msg: "Missing `Atarget` variable.",
		}
	}

    // Check if the first lock is EZ_21
    if (response.includes("EZ_21")) {
        // Iterate over each of the passwds
        for (var i = 0; i < passwds.length; i++) {
            var passwd = passwds[i];
            // Set the args we're passing to the target, then store the output
            // to a variable.
            call_args.EZ_21 = passwd;
            response = target.call(call_args);

            // Kill the process when we have a success.
            if (response.includes("`NLOCK_UNLOCKED` EZ_21")) {
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
    
    return response;
}