function create(name, categoryId) {
  return {
    data: {
      name,
      categoryId,
    },
    select: {
      name: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  };
}

function getAll(take, skip) {
  return {
    select: {
      name: true,
      category: {
        select: {
          name: true,
        },
      },
    },
    take: take !== undefined ? Number(take) : undefined,
    skip: skip !== undefined ? Number(skip) : undefined,
  };
}

function getById(id) {
  return {
    where: {
      id,
    },
    select: {
      name: true,
      category: {
        select: {
          name: true,
        },
      },
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
    select: {
      name: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  };
}

function destroy(id) {
  return {
    where: {
      id,
    },
    select: {
      name: true,
      category: {
        select: {
          name: true,
        },
      },
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
