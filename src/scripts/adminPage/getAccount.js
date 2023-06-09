import { getAllDepartments } from './adminDepartment.js';
import { getAllUsers } from './adminUsers.js';
import { validAdminToken } from '../../pages/adminPage/index.js';
import { userList, departmentList  } from '../../pages/adminPage/index.js';

function renderDepartmentCards(arr) {

  departmentList.innerHTML = '';
  arr.forEach(department => {

    const card = departmentCard(department);
    if (card) {
      departmentList.append(card);
    }
  })
}

async function getUserData() {

  if (validAdminToken) {

    const departmentArr = await getAllDepartments(validAdminToken);

    const userArr = await getAllUsers(validAdminToken)
    renderUserCards(userList, userArr);
    renderDepartmentCards(departmentArr);

  }
}

function adminUserCards(obj) {

  if (obj.username !== 'ADMIN') {

    const userCard         = document.createElement('li');
    const userName         = document.createElement('h3');
    const userExpLevel     = document.createElement('p');
    const companyName      = document.createElement('p');
    const actionsDiv       = document.createElement('div');
    const actionIconPencil = document.createElement('img');
    const actionIconTrash  = document.createElement('img');

    actionsDiv.setAttribute('data-uuid', obj.uuid);

    userCard.classList.add('user');
    userName.classList.add('userName');
    userExpLevel.classList.add('userExp');
    companyName.classList.add('companyName');
    actionsDiv.classList.add('actionsDiv');
    actionIconPencil.classList.add('action', 'editUser');
    actionIconTrash.classList.add('action', 'deleteUser');

    userName.innerText = obj.username;
    userExpLevel.innerText = obj.professional_level;
    // companyName.innerText = obj.

    actionIconPencil.src = '../../assets/icons/blackPencilIcon.svg';
    actionIconTrash.src = '../../assets/icons/trashbinIcon.svg';

    actionsDiv.append(actionIconPencil, actionIconTrash);
    userCard.append(userName, userExpLevel, companyName, actionsDiv);

    return userCard;
  }
}

function renderUserCards(list, arr) {

  list.innerHTML = '';
  arr.forEach(card => {

    const item = adminUserCards(card);
    if (item) {
      list.append(item);
    }
  });
}

function departmentCard(obj) {

  const card             = document.createElement('li');
  const departmentName   = document.createElement('h3');
  const departmentDesc   = document.createElement('p');
  const companyName      = document.createElement('p');
  const actionsDiv       = document.createElement('div');
  const actionIconEye    = document.createElement('img');
  const actionIconPencil = document.createElement('img');
  const actionIconTrash  = document.createElement('img');

  actionsDiv.setAttribute('data-uuid', obj.uuid);

  card.classList.add('department');
  departmentName.classList.add('departmentName');
  departmentDesc.classList.add('departmentDesc');
  companyName.classList.add('companyName');
  actionsDiv.classList.add('actionsDiv');
  actionIconEye.classList.add('action', 'visualize');
  actionIconPencil.classList.add('action', 'editDepartment');
  actionIconTrash.classList.add('action', 'deleteDepartment');

  departmentName.innerText = obj.name;
  departmentDesc.innerText = obj.description;
  companyName.innerText    = obj.companies.name;

  actionIconEye.src    = '../../assets/icons/eyeIcon.svg';
  actionIconPencil.src = '../../assets/icons/blackPencilIcon.svg';
  actionIconTrash.src  = '../../assets/icons/trashbinIcon.svg';

  actionsDiv.append(actionIconEye, actionIconPencil, actionIconTrash);
  card.append(departmentName, departmentDesc, companyName, actionsDiv);

  return card;
}

export { getUserData, renderDepartmentCards };