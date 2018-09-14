const date = new Date();
// 湿度处理
export function humidity(h) {
  if (h) {
    return '湿度 ' + h + '%'
  }
  return h
}

// 根据风的 code 和风力输出文案
export function wind(code, level) {
  if (!code) {
    return '无风'
  }
  if (level) {
    level = level.toString().split('-')
    level = level[level.length - 1]
    return code + ' ' + level + '级'
  }

  return code
}

/**
 * 格式化日期 
 * @param {*} index 
 * @param {*} week 
 */
export function formatWeeklyDate(index, week) {
  if (!index || !week) {
    console.error('Function formatWeeklyDate should have two arguments');
    // return;
  }

  if (index === 0) {
    return '今天'
  } else if (index === 1) {
    return '明天'
  } else if (index === 2) {
    return '后天'
  } else {
    return  formatDay(new Date(week).getDay());
  }
}

/**
 * 将0-6转化为对应的星期
 * @param {number} day 
 */
function formatDay(day) {
  switch (day) {
    case 0:
      return '星期天';
    case 1:
      return '星期一';
    case 2:
      return '星期二';
    case 3:
      return '星期三';
    case 4:
      return '星期四';
    case 5:
      return '星期五';
    case 6:
      return '星期六'
  }
}



export function formatDate(time) {
  if (!time) {
    console.warn('time is now defined');
    return ""
  }
  time = time.split('-');
  return `${time[1]}/${time[2]}`;
}

export function windLevel(wind) {
  if (wind) {
    return `${wind}级`;
  }
}
