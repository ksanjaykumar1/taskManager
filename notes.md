
## Logger setup

1. Import Logger

const Logger = require('../logger/logger');

2. Setup Logger in that file

const logger = Logger.getLogger('./controller/tasks');

the path of the file should be from the root folder



## MongoDb

Schema defines the structure 
Model creates a interface to interact with collection
using model we will perform CRUD operation 

instance of model is called documents

