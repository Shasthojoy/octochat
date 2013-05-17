var settings = {
  'port' : 3000
};

exports.loadSettings = function() {
  if (process.env.PORT)
    settings.port = process.env.PORT;

  return settings;
};
