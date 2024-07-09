Page({
  data: {
    title: '',
    description: '',
    isEdit: false,
    index: -1
  },

  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('editData', (data) => {
      this.setData({
        title: data.title,
        description: data.description,
        isEdit: data.isEdit,
        index: data.index
      });
    });
  },

  // 处理标题输入
  handleTitleInput(e) {
    this.setData({
      title: e.detail.value
    });
  },

  // 处理描述输入
  handleDescriptionInput(e) {
    this.setData({
      description: e.detail.value
    });
  },

  // 保存任务
  saveTodo() {
    const { title, description, isEdit, index } = this.data;
    if (title.trim() !== '') {
      const newTodo = { title, description, completed: false };
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.emit('updateTodo', { newTodo, isEdit, index });
      wx.navigateBack();
    }
  },

  // 取消编辑
  cancelEdit() {
    wx.navigateBack();
  }
});
