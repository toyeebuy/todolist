Page({
  data: {
    todos: []
  },


  onShow() {
    let todos = wx.getStorageSync('todos');
    if (todos && todos.length > 0) {
      this.setData({
        todos: JSON.parse(todos)
      })
    }
  },

  // 打开添加任务页面
  openAddTodo() {
    wx.navigateTo({
      url: '../todoedit/todoedit',
      events: {
        updateTodo: (data) => {
          this.addOrUpdateTodo(data);
        }
      },
      success: (res) => {
        res.eventChannel.emit('editData', {
          title: '',
          description: '',
          isEdit: false,
          index: -1
        });
      }
    });
  },

  // 打开编辑任务页面
  openEditTodo(e) {
    const index = e.currentTarget.dataset.index;
    const todo = this.data.todos[index];
    wx.navigateTo({
      url: '../todoedit/todoedit',
      events: {
        updateTodo: (data) => {
          this.addOrUpdateTodo(data);
        }
      },
      success: (res) => {
        res.eventChannel.emit('editData', {
          ...todo,
          isEdit: true,
          index
        });
      }
    });
  },

  // 切换任务完成状态
  toggleTodo(e) {
    const index = e.currentTarget.dataset.index;
    const todos = this.data.todos.slice();
    todos[index].completed = !todos[index].completed;
    this.setData({
      todos
    });
    wx.setStorageSync('todos', JSON.stringify(this.data.todos));
  },

  // 删除任务
  deleteTodo(e) {
    const index = e.currentTarget.dataset.index;
    const todos = this.data.todos.slice();
    todos.splice(index, 1);
    this.setData({
      todos
    });
    wx.setStorageSync('todos', JSON.stringify(this.data.todos));
  },

  // 清空所有任务
  clearTodos() {
    this.setData({
      todos: []
    });
    wx.setStorageSync('todos', JSON.stringify(this.data.todos));
  },

  // 添加或更新任务
  addOrUpdateTodo({
    newTodo,
    isEdit,
    index
  }) {
    if (isEdit) {
      let todos = this.data.todos.slice();
      todos[index] = newTodo;
      this.setData({
        todos
      });
    } else {
      this.setData({
        todos: [...this.data.todos, newTodo]
      });
    }
    wx.setStorageSync('todos', JSON.stringify(this.data.todos));
  }
});