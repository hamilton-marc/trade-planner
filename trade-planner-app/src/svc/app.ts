import express from "express";
import bodyParser from "body-parser";

import { ReadingLogController, StudentController } from "./controllers";

/**
 * This class wraps ExpressJS in an object and does all the setup and
 * configuration.
 *
 * @author Union Hills Software
 * @date   November 20, 2018
 *
 */

export class AppServer {

    constructor(
        public  readonly app: express.Application = express(),
        private readonly readingLogController: ReadingLogController = new ReadingLogController(express.Router()),
        private readonly studentController: StudentController = new StudentController(express.Router())
    ) {
        this.setupExpress();
        this.setupDefaultRoutes();
        this.setupRouteControllers();
    }

    /**
     * Rather than define the behavior for the different routes in this class,
     * we've set up separate controller classes which encapsulate the behavior
     * for the various routes.
     *
     */
    private setupRouteControllers() {
        // Note: I think the only reason why we can use 'this' in this context is
        // because this method is being called from the constructor.  When we
        // tried this in the Controller class with one of the callbacks,
        // Typescript kept barking at us about 'this' being undefined.

        this.app.use('/api/readinglogs', this.readingLogController.getRouter());
        this.app.use('/api/students', this.studentController.getRouter());
    }

    /**
     * Sets up general utility routes that are not specific to the application
     * logic.
     *
     */
    private setupDefaultRoutes() {
        this.app.get('/api/healthcheck', (req, res) => res.send('OK'));
    }

    /**
     * General housekeeping setup for Express to be able to serve up the API.
     *
     */
    private setupExpress() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    public setStatic(subdir: string) {
        this.app.use(express.static(subdir));
        this.app.use('/', express.static(subdir));
    }

    /**
     * This method helps us to deal with the absurdity of Angular not being
     * able to handle a page refresh. We probably need to improve this
     * in some way.
     *
     * @param path 
     */
    public setDefault(path: string) {
        this.app.use('*', express.static(path));
    }

    /**
     * Starts Express with an optional port number.
     *
     */
    public start(port: number) {
        this.app.listen(port, () => {
            console.log('Server listening on port:' + port);
        });
    }
}

const appServer: AppServer = new AppServer(express());

export default appServer;
