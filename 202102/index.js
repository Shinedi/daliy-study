var findKthLargest = function(nums, k) {
    let len =  nums.length;
    for (let i = len-1; i >= len-k; i--) {
        for (let j = 0; j < i; j++) {
            if (nums[j] > nums[i]) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
            }
        }
    }
    
    return nums[len-k];
};
findKthLargest([3,2,1,5,6,4], 2)