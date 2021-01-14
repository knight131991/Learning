const removeDataById = (sourcePath, id) => {
  const data = JSON.parse(fs.readFileSync(sourcePath) || "[]");
  const resultData = data
    .map((item) => (item.id === Number(id) ? "" : item))
    .filter((item) => item);
  fs.writeFileSync(sourcePath, JSON.stringify(resultData));
};

module.exports = removeDataById;
