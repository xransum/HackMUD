function getPrimes(max) {
	var sieve = [], i, j, primes = [];
	for (i = 2; i <= max; ++i) {
		if (!sieve[i]) {
			// i has not been marked -- it is prime
			primes.push(i);
			for (j = i << 1; j <= max; j += i) {
				sieve[j] = true;
			}
		}
	}
	return primes;
}

function ezOptions(ezNumber) {
	if ([21, 35, 40].includes(ezNumber)) {
		return ["open", "unlock", "release"]
	}
	else if (ezNumber == 35) {
		// Generate a list of numbers from 0-9
		return Array.from(Array(10), (_, n) => n);
	}
	else if (ezNumber == 40) {
		// Generate a list of odd numbers between 0 and 100
		return getPrimes(100);
	}
	else {
		// Idk unknown option, maybe?
	}
	
	return null;
}

function ezXX(ezValue) {
	var ezNumber = parseInt(ezValue.match(/\d+/g)[0]);
	return ezOptions(ezNumber);
}

function (context, args) {
	/* Crack script for C002 locks. */
    var target = args.t;
    var response = target.call({});
	
	var colorValues = {
		"red": {
			number: 3, compliments: []
		},
		"blue": {
			number: 4, compliments: ["green", "orange"]
		},
		"cyan": {
			number: 4, compliments: []
		},
		"lime": {
			number: 4, compliments: []
		},
		"green": {
			number: 5, compliments: ["yellow", "purple", "blue", "orange"]
		},
		"purple": {
			number: 6, compliments: ["yellow", "green"]
		},
		"yellow": {
			number: 6, compliments: ["purple", "green"]
		},
		"orange": {
			number: 6, compliments: ["green", "blue"]
		},
	};
	var colorNames = Object.keys(colorValues);
	var getColorNumber => (color) => colorValues[color].number;
	var getColorCompliment => (color) => colorValues[color].compliments;
	
	// c00<X>: "blue", color_digit: 4
	// c00<X>: "green", c00<X>_complement: "orange"
	// ez_<21,35,40>: ["open", "unlock", "release"]
	
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