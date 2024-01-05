function create(name) {
  return {
    data: {
      name,
    },
  };
}

function getAll(take, skip) {
  return {
    take: take !== undefined ? Number(take) : undefined,
    skip: skip !== undefined ? Number(skip) : undefined,
  };
}

function getById(id) {
  return {
    where: {
      id,
    },
  };
}

function update(id, name) {
  return {
    data: {
      name,
    },
    where: {
      id,
    },
  };
}

function destroy(id) {
  return {
    where: {
      id,
    },
  };
}

export default {
  create,
  getAll,
  getById,
  update,
  destroy,
};
