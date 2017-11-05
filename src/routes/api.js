const statusDb = require('../mongodb/status');
const linesDb = require('../mongodb/lines');
const wrap = require('express-async-wrap');

module.exports = (app) => {

  // Fetch the current status of all the lines.
  app.get("/status", wrap(async (req, res) => {
    const status = await statusDb.get();
    for (const shortName in status.lines) {
      const id = status.lines[shortName];
      const line = await linesDb.find(id);
      delete line._id;
      status.lines[shortName] = line;
    }
    delete status._id;

    status.description = "";

    res.json(status);
  }));

  return app;
};
