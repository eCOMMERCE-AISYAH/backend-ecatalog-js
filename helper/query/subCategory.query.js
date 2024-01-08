function create(name, categoryId) {
  return {
    data: {
      name,
      categoryId,
    },
    include: {
      category: true,
    },
  };
}

function getAll(take, skip) {
  return {
    take: take !== undefined ? Number(take) : undefined,
    skip: skip !== undefined ? Number(skip) : undefined,
    include: {
      category: true,
    },
  };
}

function getById(id) {
  return {
    where: {
      id,
    },
    include: {
      category: true,
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
    include: {
      category: true,
    },
  };
}

function destroy(id) {
  return {
    where: {
      id,
    },
    include: {
      category: true,
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
