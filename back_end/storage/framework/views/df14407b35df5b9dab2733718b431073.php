<form action="<?php echo e(route('login')); ?>" method="post" enctype="multipart/form-data">
    <?php echo csrf_field(); ?>
   
    
    <input type="email" name="email" id="" placeholder="email">
    <br><br>
    
    <input type="password" name="password" id="" placeholder="pass">
    <br><br>
    <button class="btn btn-success" type="submit">Save</button>
   
</form><?php /**PATH C:\Users\ASUS\Downloads\Du_An_TN-main\Du_An_TN\back_end\resources\views/test.blade.php ENDPATH**/ ?>